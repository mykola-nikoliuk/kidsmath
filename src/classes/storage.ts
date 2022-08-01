import { getMessageId } from "../messageHandler";

const fs = require('fs');
const path = require('path');
const {
  addImageWatermark,
  addVideoWatermark,
  removeImageWatermark,
  removeVideoWatermark,
} = require('../utils');

const SAVE_FILE_PATH = path.resolve(__dirname, '../../save.json');

const queue = [];
const publishQueue = [];
const proposals = {};
const banList = [];
let proposalCount = 0;
const schedule = getEmptySchedule();
let watermark = true;

load();

function save() {
  fs.writeFileSync(
    SAVE_FILE_PATH,
    JSON.stringify({
      queue,
      publishQueue,
      proposals,
      proposalCount,
      schedule,
      banList,
      watermark,
    }, null, 2),
  );
}

function load() {
  if (fs.existsSync(SAVE_FILE_PATH)) {
    const file = fs.readFileSync(SAVE_FILE_PATH, 'utf8');
    const data = JSON.parse(file);
    queue.splice(0);
    queue.push(...data.queue);
    publishQueue.splice(0);
    publishQueue.push(...data.publishQueue);
    Object.assign(proposals, data.proposals);
    proposalCount = data.proposalCount;
    watermark = data.watermark;
    banList.splice(0);
    banList.push(...(data.banList || []));
    Object.assign(schedule, data.schedule || getEmptySchedule());
  }
}

export function applyScheduleTime(scheduleTime): void {
  Object.assign(schedule, scheduleTime);
  save();
}

export function getScheduleTime() {
  const currentDay = new Date();
  currentDay.setHours(0, 0, 0, 0);
  return {
    startDate: new Date(currentDay.getTime() + storage.schedule.startOffset),
    endDate: new Date(currentDay.getTime() + storage.schedule.endOffset),
  };
}

function getEmptySchedule() {
  return {
    startOffset: 0,
    endOffset: 86400000,
  }
}

export function toggleWatermarkState() {
  watermark = !watermark;
  save();
}

export function getWatermarkState(): boolean {
  return watermark;
}

async function pushPublishMessage(msg) {
  publishQueue.push(msg);
  save();
  if (getWatermarkState()) {
    await Promise.all([
      addImageWatermark(msg),
      addVideoWatermark(msg),
    ]);
  }
}

function pushMessage(msg) {
  queue.push(msg);
  save();
}

function clearQueue() {
  queue.splice(0);
  save();
}

function removeMessageFromQueue(msg) {
  const messageId = getMessageId(msg);

  const index = publishQueue.findIndex(msg => {
    const itemMessageId = getMessageId(msg);
    return itemMessageId === messageId
  });
  if (index !== -1) {
    publishQueue.splice(index, 1);
  }

  return Promise.all([
    removeImageWatermark(msg),
    removeVideoWatermark(msg),
  ]);
}

function getMessageToPublish(messageId?) {
  let element = null;

  if (messageId) {
    const index = publishQueue.findIndex(msg => {
      const itemMessageId = getMessageId(msg);
      return itemMessageId === messageId
    });
    if (index !== -1) {
      element = publishQueue.splice(index, 1)[0];
    }
  } else {
    element = publishQueue.shift();
  }
  save();
  return element;
}

function clearPublishQueue() {
  publishQueue.slice().forEach(removeMessageFromQueue);
  save();
}

function addProposalMessage(msg) {
  proposalCount++;
  proposals[proposalCount] = msg;
  save();
  return proposalCount;
}

function approveProposalMessage(id) {
  const proposal = proposals[id];
  if (proposal) {
    pushPublishMessage(proposal);
    save();
    delete proposals[id];
  }
}

function declineProposalMessage(id) {
  delete proposals[id];
  save();
}

function banUser(userId) {
  if (!isUserBanned(userId)) {
    banList.push(userId);
    save();
  }
}

function isUserBanned(userId) {
  return banList.includes(userId);
}

export const storage = {
  queue,
  publishQueue,
  proposals,
  schedule,
  pushMessage,
  clearQueue,
  pushPublishMessage,
  getMessageToPublish,
  clearPublishQueue,
  addProposalMessage,
  approveProposalMessage,
  declineProposalMessage,
  removeMessageFromQueue,
  banUser,
  isUserBanned,
};

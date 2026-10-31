import { request, serverText } from './client.js'

export const getTags = () => request('/tags')
export const getTasks = () => request('/tasks')
export const getTimestamps = () => request('/timestamps')
export const getOptions = () => request('/options/1')

export const createTag = (name) =>
  request('/tags', {
    method: 'POST',
    body: JSON.stringify({ name: serverText(name), additional_data: '' }),
  })

export const createTask = ({ name, tagIds = [] }) =>
  request('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      name: serverText(name),
      tags: tagIds.join(','),
      additional_data: '',
    }),
  })

export const updateTask = (task) =>
  request(`/tasks/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: serverText(task.name),
      tags: task.tagIds.join(','),
      additional_data: serverText(task.additionalData),
    }),
  })

export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' })

export const createTimestamp = ({ timestamp, taskId, type }) =>
  request('/timestamps', {
    method: 'POST',
    body: JSON.stringify({ timestamp, task: taskId, type }),
  })

export const updateTimestamp = (record) =>
  request(`/timestamps/${record.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      timestamp: record.timestamp,
      task: record.taskId,
      type: record.type,
    }),
  })

export const deleteTimestamp = (id) =>
  request(`/timestamps/${id}`, { method: 'DELETE' })

export const updateOptions = (options) =>
  request('/options/1', {
    method: 'PUT',
    body: JSON.stringify({
      theme: serverText(options.theme),
      alternative: options.alternative ? 1 : 0,
      own_textual_data: serverText(options.ownTextualData),
    }),
  })

export function normalizeTag(tag) {
  return {
    id: Number(tag.id),
    name: tag.name,
    additionalData: tag.additional_data ?? '',
  }
}

export function normalizeTask(task) {
  return {
    id: Number(task.id),
    name: task.name,
    tagIds: String(task.tags ?? '')
      .split(',')
      .filter(Boolean)
      .map(Number),
    additionalData: task.additional_data ?? '',
  }
}

export function normalizeTimestamp(record) {
  return {
    id: Number(record.id),
    timestamp: record.timestamp,
    taskId: Number(record.task),
    type: Number(record.type),
  }
}

export function normalizeOptions(options) {
  return {
    theme: options.theme === 'dark' ? 'dark' : 'light',
    alternative: Number(options.alternative) === 1,
    ownTextualData: options.own_textual_data ?? '',
  }
}

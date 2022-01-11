import emitter from './emitter';

export default function pushToast(data, title) {
  console.log('toast', data, title);

  let message;

  if (typeof data.message === 'string') {
    message = data.message;
  } else if (typeof data.message === 'object') {
    message = data.message.join(', ');
  } else {
    message = null;
  }

  const successMsg = {
    style: 'white',
    title,
    message,
  };

  const failMsg = {
    style: 'danger',
    title,
    message,
  };

  if (data.success) {
    emitter.emit('push-toast', successMsg);
  } else {
    emitter.emit('push-toast', failMsg);
  }
}

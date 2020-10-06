type Type = string;

type Id = number;

type Listener = (payload: any) => void;

interface Events<TListener> {
  [type: string]: {
    id: Id;
    listener: TListener;
  }[];
}

export default class Emitter<TType extends Type, TListener extends Listener, TPayload = any> {
  events: Events<TListener> = {};

  id: Id = 1;

  emit(type: TType, payload: TPayload) {
    if (this.events[type]) {
      this.events[type].forEach(({ listener }) => {
        listener(payload);
      });
    }
  }

  on(type: TType, listener: TListener) {
    const id: Id = ++this.id;
    this.events = {
      ...this.events,
      [type]: [
        ...(this.events[type] || []),
        {
          listener,
          id,
        },
      ],
    };
    return id;
  }

  once(type: TType, listener: TListener) {
    const id: Id = ++this.id;
    this.events = {
      ...this.events,
      [type]: [{ listener, id }],
    };
    return id;
  }

  off(id: Id) {
    this.events = Object.keys(this.events).reduce((obj, key) => {
      return {
        ...obj,
        [key]: this.events[key].filter(item => item.id !== id),
      };
    }, {});
  }

  offReference(type: TType, listener: TListener) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter(item => {
        return item.listener !== listener;
      });
    }
  }

  offEvent(type: TType) {
    if (this.events[type]) {
      this.events = Object.keys(this.events).reduce((obj, key) => {
        return {
          ...obj,
          ...(key === type ? {} : { [key]: this.events[key] }),
        };
      }, {});
    }
  }
}

const Event = new Emitter();

Event.emit('test', { name: 'abc' });

// Event.on('')

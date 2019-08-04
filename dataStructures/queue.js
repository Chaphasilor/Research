function Queue() {
  this.head = null;
  this.length = 0;
}

Queue.prototype.enqueue = function(data) {
  let queueItem = new QueueItem(data);
  if (this.head == null) {
    this.head = queueItem;
  } else {
    let currentItem = this.head;
    while (currentItem.next != null) {
      currentItem = currentItem.next;
    }
    currentItem.next = queueItem;
  }
  this.length++;
}

Queue.prototype.dequeue = function() {
  if (this.head != null) {  
    let head = this.head;
    this.head = this.head.next;
    return head.data;
    this.length--;
  } else {
    return null;
  }
}

function QueueItem(data) {
  this.data = data;
  this.next = null;
}
function Stack() {
  this.top = null;
  this.size = 0;
}

Stack.prototype.push = function(data) {
  let stackItem = new StackItem(data);
  if (this.top != null) {
    stackItem.below = this.top;
  }
  this.top = stackItem;
}

Stack.prototype.pop = function() {
  let top = this.top;
  if (this.top != null) {
    this.top = this.top.below;
    return top.data;
  }
  return null;
}

Stack.prototype.peek = function() {
  if (this.top != null) {
    return this.top.data;  
  }
  return null;
}

function StackItem(data) {
  this.data = data;
  this.below = null;
}
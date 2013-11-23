MM.Command.Select = function() {
	MM.Command.call(this);
}
MM.Command.Select.prototype = Object.create(MM.Command.prototype);
MM.Command.Select.prototype.isValid = function() {
	return (MM.App.selection.get().length == 1 && !MM.App.editing);
};
MM.Command.Select.prototype._move = function(diff) {
	var selection = MM.App.selection;
	var item = selection.get()[0];
	var parent = item.getParent();
	var children = parent.getChildren();
	var index = children.indexOf(item);
	index += diff;
	index = (index+children.length) % children.length;
	selection.remove(item);
	selection.add(children[index]);
}
MM.Command.Select.prototype._parent = function() {
	var item = selection.get()[0];
	var parent = item.getParent();
	if (!parent) { return; }
	
	selection.remove(item);
	selection.add(parent);
}
MM.Command.Select.prototype._child = function(side) {
	var item = selection.get()[0];
	var children = item.getChildren(side);
	if (!children.length) { return; }

	selection.remove(item);
	selection.add(children[0]);
}
MM.Command.Select.prototype._getSide = function() {
}

MM.Command.SelectLeft = function() {
	MM.Command.Select.call(this);
	this._keys.push({keyCode: 37, type:"keydown"});
}
MM.Command.SelectLeft.prototype = Object.create(MM.Command.Select.prototype);
MM.Command.SelectLeft.prototype.isValid = function() {
	if (!MM.Command.Select.prototype.isValid.call(this)) { return false; }
	/* FIXME */
};

MM.Command.SelectRight = function() {
	MM.Command.Select.call(this);
	this._keys.push({keyCode: 39, type:"keydown"});
}
MM.Command.SelectRight.prototype = Object.create(MM.Command.Select.prototype);
MM.Command.SelectRight.prototype.isValid = function() {
	if (!MM.Command.Select.prototype.isValid.call(this)) { return false; }
	/* FIXME */
};

MM.Command.SelectUp = function() {
	MM.Command.Select.call(this);
	this._keys.push({keyCode: 38, type:"keydown"});
}
MM.Command.SelectUp.prototype = Object.create(MM.Command.Select.prototype);
MM.Command.SelectUp.prototype.execute = function() {
	return this._move(-1);
};

MM.Command.SelectDown = function() {
	MM.Command.Select.call(this);
	this._keys.push({keyCode: 40, type:"keydown"});
}
MM.Command.SelectDown.prototype = Object.create(MM.Command.Select.prototype);
MM.Command.SelectDown.prototype.execute = function() {
	return this._move(+1);
};
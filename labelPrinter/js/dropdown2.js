document.body.addEventListener('click', function(e) {
  let element = e.target.closest('input');
  if(element !== null && element.type == "radio") {
    toggleOptions(element);
    console.log(element.value);
  }
  element = e.target.closest('label');
  if (element !== null) {
    element.previousElementSibling.checked = true;
    toggleOptions(element.parentNode);
    eval(element.parentNode.getAttribute('callback'));
    console.log(element.innerHTML);
  }
});

function toggleOptions(wrapper) {
  if (wrapper.classList.contains('expanded')) {
    hideOptions(wrapper);
  } else {
    showOptions(wrapper);
  }
}

function showOptions(parent) {
  
  parent.classList.add('expanded');
  
  let radios = parent.querySelectorAll('input[type=radio]');
  
}

function hideOptions(parent) {
  
  parent.classList.remove('expanded');

}
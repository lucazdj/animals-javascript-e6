const onMouseMove = {
  handleEvent(event) {
    this.tooltipBox.style.top = `${event.pageY + 24}px`;
    this.tooltipBox.style.left = `${event.pageX + 24}px`;
  },
};

const onMouseLeave = {
  handleEvent() {
    this.tooltipBox.remove();
    this.element.removeEventListener('mouseleave', onMouseLeave);
    this.element.removeEventListener('mousemove', onMouseMove);
  },
};

function createTooltipBox(element) {
  const tooltipBox = document.createElement('div');
  const text = element.getAttribute('aria-label');
  tooltipBox.classList.add('tooltip');
  tooltipBox.innerText = text;
  document.body.appendChild(tooltipBox);
  return tooltipBox;
}

function onMouseOver() {
  const tooltipBox = createTooltipBox(this);

  onMouseMove.tooltipBox = tooltipBox;
  this.addEventListener('mousemove', onMouseMove);

  onMouseLeave.tooltipBox = tooltipBox;
  onMouseLeave.element = this;
  this.addEventListener('mouseleave', onMouseLeave);
}

export default function initTooltip() {
  const tooltips = document.querySelectorAll('[data-tooltip]');

  tooltips.forEach((item) => {
    item.addEventListener('mouseover', onMouseOver);
  });
}

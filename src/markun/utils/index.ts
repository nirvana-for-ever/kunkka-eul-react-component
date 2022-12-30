// @ts-nocheck
export * from './cmOperate';

const safari = /Apple Computer/.test(navigator.vendor);
const ios =
  safari &&
  (/Mobile\/\w+/.test(navigator.userAgent) || navigator.maxTouchPoints > 2);
const mac = ios || /Mac/.test(navigator.platform);

export const isMac = mac;

function isFullScreen() {
  return !!(
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.webkitFullScreen ||
    document.msFullScreen
  );
}

function exitFullscreen() {
  if (document.exitFullScreen) {
    document.exitFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (element.msExitFullscreen) {
    element.msExitFullscreen();
  }
}

export const fullScreen = (ele: any) => {
  if (isFullScreen()) {
    exitFullscreen();
    return;
  }
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  }
};

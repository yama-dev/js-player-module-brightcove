
export let viewPlayerStyle = `
#{{ id }} {
  position: relative;
}
#{{ id }} .on {
  display: none;
}
#{{ id }} .off {
  display: block;
}
#{{ id }} .ui-btn-play {
  width: 120px;
  display: block;
  cursor: pointer;
}
#{{ id }} .ui-btn-play.active {
  display: none;
}
#{{ id }} .ui-btn-play:hover .on {
  display: block;
}
#{{ id }} .ui-btn-play:hover .off {
  display: none;
}
#{{ id }} .ui-btn-pause {
  width: 120px;
  display: none;
  cursor: pointer;
}
#{{ id }} .ui-btn-pause.active {
  display: block;
}
#{{ id }} .ui-btn-pause:hover .on {
  display: block;
}
#{{ id }} .ui-btn-pause:hover .off {
  display: none;
}
#{{ id }} .ui-btn-stop {
  width: 120px;
  cursor: pointer;
}
#{{ id }} .ui-btn-stop.active {
  display: block;
}
#{{ id }} .ui-btn-stop:hover .on {
  display: block;
}
#{{ id }} .ui-btn-stop:hover .off {
  display: none;
}
#{{ id }} .ui-btn-mute {
  width: 120px;
  cursor: pointer;
}
#{{ id }} .ui-btn-mute.active .on {
  display: block;
}
#{{ id }} .ui-btn-mute.active .off {
  display: none;
}
#{{ id }} .ui-seekbar-vol {
  width: 100%;
  height: 13px;
  padding: 4px 0;
  position: relative;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  touch-action: manipulation;
}
#{{ id }} .ui-seekbar-vol .ui-seekbar-vol_bg {
  width: 100%;
  height: 5px;
  background: #ddd;
  position: absolute;
  top: 0;
  left: 0;
  margin: 4px 0;
}
#{{ id }} .ui-seekbar-vol span {
  display: block;
  width: 0%;
  height: 100%;
  background: #666;
  position: relative;
}
#{{ id }} .ui-seekbar-time {
  width: 100%;
  height: 13px;
  padding: 4px 0;
  position: relative;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  touch-action: manipulation;
}
#{{ id }} .ui-seekbar-time .ui-seekbar-time-bg {
  width: 100%;
  height: 5px;
  background: #ddd;
  position: absolute;
  top: 0;
  left: 0;
  margin: 4px 0;
}
#{{ id }} .ui-seekbar-time span {
  display: block;
  width: 0%;
  height: 100%;
  background: #666;
  position: relative;
}
#{{ id }} .ui-display-poster img {
  max-width: 100%;
}
`;

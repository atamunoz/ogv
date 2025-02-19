import './ui/MainTemplate';
import { SelectTool } from './ogv/tool/SelectTool';
import { UrlFileLoader } from './ogv/loader/UrlFileLoader';
import { AddLayerTool } from './ogv/tool/AddLayerTool';
import { MapSetting } from './ogv/map/MapSetting';
import { TitleMapTool } from './ogv/tool/TitleMapTool';
import { AddBasemapTool } from './ogv/tool/AddBasemapTool';
import { OverviewTool } from './ogv/tool/OverviewTool';
import { FullScreenTool } from './ogv/tool/FullScreenTool';

let mapSetting = new MapSetting();
let setting = mapSetting.getSetting();
new FullScreenTool(setting);
new AddBasemapTool(setting);
new OverviewTool(setting);
new TitleMapTool(setting);
new SelectTool(setting);
new AddLayerTool(mapSetting);
new UrlFileLoader(mapSetting).load();
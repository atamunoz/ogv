import { COLOR_WIDTH_DEFAULT, PIXEL_WIDTH_VALUE, LEGEND_HEIGHT, LEGEND_INFO_ATTRIBUTE_NAME, LEGEND_INFO_MAX_VALUE, LEGEND_INFO_MIN_VALUE, HORIZONTAL_CSS_NAME, VERTICAL_CSS_NAME, LayerLegend } from './LayerLegend';
import LayerTypeName from '../layer/LayerTypeName';

const CATEGORY_COUNT_MESSAGE = 'Frecuencia de la categoria';
const LEGEND_INFO_CATEGORIES_ATTRIBUTE_NAME = 'Categorias';

export class ThematicLayerLegend extends LayerLegend {
  constructor (arg) {
    super({ id: 'thematicLayerLegend', parent: arg.parent });
    this._categories = arg.categories;
  }

  show (mapSetting, layerName) {
    this._itemCount = mapSetting.legend.itemCount;
    super.show(mapSetting, layerName);
  }

  getMaxValue () {
    const categorykeys = Object.keys(this._categories);
    return categorykeys[categorykeys.length - 1];
  }

  getMinValue () {
    const categorykeys = Object.keys(this._categories);
    return categorykeys[0];
  }

  prepareLegendInfo (mapSetting) {
    if (mapSetting.legend !== undefined) {
      mapSetting.legend.legendInfo[LEGEND_INFO_ATTRIBUTE_NAME] = mapSetting.layerSetting[LayerTypeName.THEMATIC_LAYER].attribute;
      mapSetting.legend.legendInfo[LEGEND_INFO_CATEGORIES_ATTRIBUTE_NAME] = Object.keys(this._categories).length;
      mapSetting.legend.legendInfo[LEGEND_INFO_MIN_VALUE] = this.getMinValue();
      mapSetting.legend.legendInfo[LEGEND_INFO_MAX_VALUE] = this.getMaxValue();
    }
  }

  addHorizontalLegend (colorWidth) {
    const categorykeys = Object.keys(this._categories);
    this.addValue(categorykeys[0]);

    categorykeys.forEach((categoryKey, index) => {
      const item = this.getItemLegend(categoryKey, index, HORIZONTAL_CSS_NAME, colorWidth);
      this._legendContent.appendChild(item.box);
    });

    this.addValue(categorykeys[categorykeys.length - 1]);
  }

  addVerticalLegend (colorWidth) {
    var maxWidth = 0;

    const categorykeys = Object.keys(this._categories);
    this._legendContent.style.height = LEGEND_HEIGHT;

    categorykeys.forEach((categoryKey, index) => {
      if (categoryKey.length > maxWidth) { maxWidth = categoryKey.length; }
      var item = this.getItemLegend(categoryKey, index, VERTICAL_CSS_NAME, colorWidth);
      item.boxContainer.appendChild(item.box);
      item.boxContainer.appendChild(item.label);
      if (this._itemCount !== null) { item.boxContainer.appendChild(this.getElementCount(categoryKey)); }

      this._legendContent.appendChild(item.boxContainer);
    });

    colorWidth = colorWidth === null ? COLOR_WIDTH_DEFAULT : parseInt(colorWidth);
    var width = colorWidth + (maxWidth * PIXEL_WIDTH_VALUE);
    this.setLegendContentWidth(width);
  }

  getElementCount (categoryKey) {
    const categoryTotalFeatureslabel = document.createElement('span');
    categoryTotalFeatureslabel.innerHTML = ` <b style='font-size: .6rem;'>[${this._categories[categoryKey].count}]</b>`;
    categoryTotalFeatureslabel.title = CATEGORY_COUNT_MESSAGE + ' ' + categoryKey;
    return categoryTotalFeatureslabel;
  }
}

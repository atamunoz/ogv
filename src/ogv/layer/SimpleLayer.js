import { BaseLayer } from './BaseLayer';
import simpleLayerLegend from '../legend/SimpleLayerLegend';
import { IMAGE_FIELD_NAME, SimpleLayerStyle } from '../style/SimpleLayerStyle';

export class SimpleLayer extends BaseLayer {
  constructor (features) {
    super(features);
    this._style = new SimpleLayerStyle();
    this.setLayerLegend(simpleLayerLegend);
  }

  setSetting (layerSetting) {
    this._layerSetting = layerSetting;
    const labelValue = layerSetting.geojson.label;
    if (labelValue !== undefined && labelValue !== '') { this._label = labelValue; }
  }

  checkLabelingStyle () {
    if (this._label !== undefined) {
      var style = this._layer.getStyle();
      this._layer.setStyle((feature) => {
        style.getText().setText(feature.get(this._label));
        return [style];
      });
    }
  }

  getLayer () {
    if (this.isImageLayer()) {
      this._style.setSelectTool(this._layerSetting.featureSelect);
      this._layer.setStyle(this._style.getFeatureStyle.bind(this._style));
    } else {
      this._layer.setStyle(this._style.getNextStyle());
      this.checkLabelingStyle();
    }
    return this._layer;
  }

  isImageLayer () {
    let enc = false;

    this._features.forEach((feature) => {
      if (feature.get(IMAGE_FIELD_NAME) !== undefined) {
        enc = true;
      }
    });

    return enc;
  }
}

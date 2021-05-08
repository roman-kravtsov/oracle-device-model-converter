const Converter = require("./Converter");

/**
 * A Oracle Model object
 * @typedef {Object} OracleModel
 */

/**
 * Converter from Oracle model to Thing Model
 *
 * @class OracleModelConverter
 * @extends {Converter}
 */
class OracleModelConverter extends Converter {
  /**
   * Creates an instance of ThingModel.
   * @param {OracleModel} model Oracle Model
   * @memberof OracleModelConverter
   */
  constructor(model) {
    super({ properties: {}, actions: {}, events: {} });
    this.oracleModel = model;
  }
  __generateThingProperty(property) {
    return {
      ...property,
      type: property.type.toLowerCase(),
    };
  }

  __generateThingAction(action) {
    return {
      name: action.name,
      description: action.description,
      input: { type: action.argType.toLowerCase() },
    };
  }
  __generateThingEvent(event) {
    let thingEvent = {
      name: event.name,
      description: event.description,
      type: "object",
      properties: {},
    };
    for (const field of event.value.fields) {
      thingEvent.properties[field.name] = {
        ...field,
        type: field.type.toLowerCase(),
      };
    }
    return thingEvent;
  }
  /**
   * Map properties of a Oracle Model to the properties of a Thing Model
   *
   */
  mapProperties() {
    for (const attribute of this.oracleModel.attributes) {
      const thingProperty = this.__generateThingProperty(attribute);
      this.targetModel.properties[thingProperty.name] = thingProperty;
    }
  }

  /**
   * Map actions of a Oracle Model to the actions of a Thing Model
   *
   */
  mapActions() {
    for (const action of this.oracleModel.actions) {
      const thingAction = this.__generateThingAction(action);
      this.targetModel.actions[thingAction.name] = thingAction;
    }
  }

  /**
   * Map events of a Oracle Model to the events of a Thing Model
   *
   */
  mapEvents() {
    for (const format of this.oracleModel.formats) {
      if (format.type === "ALERT") {
        const thingEvent = this.__generateThingEvent(format);
        this.targetModel.events[thingEvent.name] = thingEvent;
      }
      // const thingAction = this.__generateThingAction(action);
      // this.targetModel.actions[thingAction.name] = thingAction;
    }
  }

  /**
   * Convert Oracle Model to a Thing Model
   *
   * @returns {Object} Thing Model
   * @memberof OracleModelConverter
   */
  convert() {
    const now = new Date(Date.now());
    this.targetModel["@type"] = "ThingModel";
    this.targetModel["@context"] = ["https://www.w3.org/2019/wot/td/v1"];
    this.targetModel.created = now;
    this.targetModel.modified = now;
    this.mapProperties();
    this.mapActions();
    this.mapEvents();
    return this.targetModel;
  }
}
module.exports = OracleModelConverter;

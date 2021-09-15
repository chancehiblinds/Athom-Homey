'use strict';

const {ZwaveDevice} = require('homey-zwavedriver');

class iblindsV3 extends ZwaveDevice {

  /**
   * onInit is called when the device is initialized.
   */
  async onNodeInit() {
    this.log('iblinds V3 has been initialized');
    this.enableDebug();

    //print node info to console
    this.printNode();
    this.printNodeSummary();

    /**
     * Register Capabilities:
     * 
     * "measure_battery" = "BATTERY",
     * "onoff" = "SWITCH_BINARY",
     * "windowcoverings_tilt_down",
     * "windowcoverings_tilt_set" = "SWITCH_MULTILEVEL",
     * "windowcoverings_tilt_up"
     */

    this.registerCapability('measure_battery','BATTERY');
    this.registerCapability('onoff', 'SWITCH_BINARY');
    this.registerCapability('windowcoverings_tilt_set','SWITCH_MULTILEVEL');


    /**
     * Report Listeners
     * -SWITCH_BINARY
     *   -SWITCH_BINARY_REPORT
     * -SWITCH_MULTILEVEL
     *   -SWITCH_MULTILEVEL_REPORT
     */
    this.registerReportListener(
      'SWITCH_BINARY',
      'SWITCH_BINARY_REPORT',
      (rawReport, parsedReport) => {
        console.log('registerReportListener', rawReport, parsedReport);
      },
    );

/**
* 
 * TODO this.configurationSet({id: 'Setting id'}, #value)
 * this.configurationSet({index:1, size: 1}, #value)
 */

  } //OnNodeInit


  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeysArr An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({ oldSettings, newSettings, changedKeysArr }) {
    await super.onSettings(oldSettings, newSettings, changedKeysArr);
    this.log('iblinds V3 settings where changed');
    return 'Settings Updated';
  }


  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name) {
    this.log('iblinds V3 was renamed');
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    this.log('iblinds V3 has been deleted');
  }

}

module.exports = iblindsV3;

/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { ReadingsCSVUploadPreferencesItem, MetersCSVUploadPreferencesItem, BooleanTypes} from '../types/csvUploadForm';
import { MeterTimeSortType } from '../types/redux/meters';

// This file contains the default parameters for uploading readings and meters CSV files. These defaults should be consistent with the defaults
// specified in /src/server/services/csvPipeline/validateCsvUploadParams and with /src/server/sql/create_meters_table.sql.
export const ReadingsCSVUploadDefaults: ReadingsCSVUploadPreferencesItem = {
	meterIdentifier: '',
	timeSort: MeterTimeSortType.increasing,
	duplications: 1,
	cumulative: BooleanTypes.false,
	cumulativeReset: BooleanTypes.false,
	cumulativeResetStart: '',
	cumulativeResetEnd: '',
	lengthGap: 0,
	lengthVariation: 0,
	endOnly: BooleanTypes.false,
	gzip: false,
	headerRow: false,
	refreshReadings: false,
	update: false,
	honorDst: false,
	relaxedParsing: false,
	useMeterZone: false
};

export const MetersCSVUploadDefaults: MetersCSVUploadPreferencesItem = {
	meterIdentifier: '',
	gzip: false,
	headerRow: false,
	update: false
};

export const convertBoolean = (someBoolean: boolean): BooleanTypes => {
	return someBoolean ? BooleanTypes.true : BooleanTypes.false;
};

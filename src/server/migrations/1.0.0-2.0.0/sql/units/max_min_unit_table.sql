/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

ALTER TABLE units
    ADD COLUMN IF NOT EXISTS default_meter_minimum_value INTEGER NOT NULL DEFAULT -9007199254740991,
    ADD COLUMN IF NOT EXISTS default_meter_maximum_value INTEGER NOT NULL DEFAULT 9007199254740991
    ;
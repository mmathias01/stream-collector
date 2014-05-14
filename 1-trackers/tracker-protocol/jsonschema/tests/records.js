define([
	'intern!object',
	'intern/chai!assert',
	'intern/dojo/node!z-schema',
	'intern/dojo/node!../com.snowplowanalytics/self_desc',
	'intern/dojo/node!../com.snowplowanalytics/tracker_protocol',
	'intern/dojo/node!../com.snowplowanalytics/contexts',
	'intern/dojo/node!../com.snowplowanalytics/unstruct_event',
	'intern/dojo/node!../com.snowplowanalytics/ad_impression',
	'intern/dojo/node!../com.snowplowanalytics/ad_click',
	'intern/dojo/node!../com.snowplowanalytics/ad_conversion',
	'intern/dojo/node!../com.snowplowanalytics/link_click',
	'intern/dojo/node!../com.snowplowanalytics/screen_view',
	'intern/dojo/node!./resources/self_desc',	
	'intern/dojo/node!./resources/tracker_protocol',
	'intern/dojo/node!./resources/contexts',
	'intern/dojo/node!./resources/unstruct_event',
	'intern/dojo/node!./resources/ad_impression',
	'intern/dojo/node!./resources/ad_click',
	'intern/dojo/node!./resources/ad_conversion',
	'intern/dojo/node!./resources/link_click',
	'intern/dojo/node!./resources/screen_view'
], function(registerSuite, assert, ZSchema,
			selfDescSchema, trackerProtocolSchema,
			contextsSchema, unstructEventSchema,
			adImpressionSchema, adClickSchema, adConversionSchema, linkClickSchema, screenViewSchema,
			selfDescJsons, trackerProtocolJsons,
			contextsJsons, unstructEventJsons,
			adImpressionJsons,  adClickJsons,  adConversionJsons,  linkClickJsons,  screenViewJsons) {

	var validator = new ZSchema({sync: true}),
		testArray = [
			[selfDescSchema, selfDescJsons],
			[trackerProtocolSchema, trackerProtocolJsons],
			[contextsSchema, contextsJsons],
			[unstructEventSchema, unstructEventJsons],
			[adImpressionSchema, adImpressionJsons],
			[adClickSchema, adClickJsons],
			[adConversionSchema, adConversionJsons],
			[linkClickSchema, linkClickJsons],
			[screenViewSchema, screenViewJsons]
		],
		j;

	function testSchema(schema, json) { console.log(typeof schema, typeof json)
		registerSuite({
			name: json.name + ' schema validation',

			'Valid JSONs should pass validation': function() {
				var validJsons = json.valid,
					valid,
					i;
				for (i = 0; i < validJsons.length; i++) {
					valid = validator.validate(validJsons[i], schema);
					assert.strictEqual(valid, true, 'Valid JSON #' + (i+1) + ' should be validated');
				}	
			},

			'Invalid JSONs should fail validation': function() {
				var invalidJsons = json.invalid,
					valid,
					i;
				for (i = 0; i < invalidJsons.length; i++) {
					valid = validator.validate(invalidJsons[i], schema);
					assert.strictEqual(valid, false, 'Invalid JSON #' + (i+1) + ' should be invalidated');
				}
			}
		})
	}

	for (var j = 0; j < testArray.length; j++) {
		testSchema(testArray[j][0], testArray[j][1])
	}

});

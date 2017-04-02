define(function () {
	var current = {

		configureSubscriptionParameters: function (configuration) {
			current.$super('registerXServiceSelect2')(configuration, 'service:kpi:sonar:project', 'service/kpi/sonar/');
		},

		/**
		 * Render SonarQube project identifier.
		 */
		renderKey: function (subscription) {
			return current.$super('renderKey')(subscription, 'service:kpi:sonar:project', 'integer');
		},

		/**
		 * Render SonarQube data.
		 */
		renderFeatures: function (subscription) {
			var result = current.$super('renderServicelink')('home', subscription.parameters['service:kpi:sonar:url'] + '/dashboard/index/' + encodeURIComponent(subscription.parameters['service:kpi:sonar:project']), 'service:kpi:sonar:project', undefined, ' target=\'_blank\'');
			// Help
			result += current.$super('renderServiceHelpLink')(subscription.parameters, 'service:kpi:help');
			return result;
		},

		/**
		 * Render Sonar details : id, name and pkey.
		 */
		renderDetailsKey: function (subscription) {
			return current.$super('generateCarousel')(subscription, [
				['id', current.renderKey(subscription)],
				['service:kpi:sonar:project', subscription.data.project.name],
				['service:kpi:sonar:key', subscription.data.project.key]
			], 1);
		},

		/**
		 * Display the Sqale rating : A...E
		 */
		renderDetailsFeatures: function (subscription) {
			var rating = subscription.data.project.measures && subscription.data.project.measures.sqale_rating;
			var color = rating && ['success', 'primary', 'warning', 'danger', 'danger', 'danger'][rating - 1];
			return color ? '<span data-toggle="tooltip" title="Sqale Rating" class="label label-' + color + '">' + String.fromCharCode(64 + rating) + '</span>' : '';
		}
	};
	return current;
});

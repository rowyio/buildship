<?php
/**
 * Buildship Chat Widget
 *
 *
 * @wordpress-plugin
 * Plugin Name:       Buildship Chat Widget
 * Plugin URI:        https://github.com/rowyio/buildship-chat-widget
 * Description:       BuilShip Chat Widget Plugin
 * Author:            BuildShip
 * Version:           0.1.0
 * Author URI:        https://buildship.com
 * Network:           True
 * Text Domain:       buildship
 */

define('CHAT_WIDGET_DIR', plugin_dir_path(__FILE__));
define('CHAT_WIDGET_VERSION', '0.1.0');
define('CHAT_WIDGET_MAIN_FILE', __FILE__);
define('CHAT_WIDGET_SETTINGS', 'chat_widget_settings');
define('CHAT_WIDGET_SCREEN', 'chat_widget_screen');


require_once CHAT_WIDGET_DIR . 'class-buildship-chat-widget.php';

ChatWidget::add_hooks();

function buildship_chat_widget_scripts()
{
  $settings = ChatWidget::get_settings();
  // basic settings
  $endpoint_url = esc_html($settings['endpoint_url']);
  $widget_title = esc_html($settings['widget_title']);
  $greeing_message = esc_html($settings['greeting_message']);
  $button_name = esc_html($settings['button_name']);
  // advanced settings
  $response_is_a_stream = (bool) $settings["response_is_a_stream"];
  $close_on_outside_click = (bool) $settings["close_on_outside_click"];
  $open_on_load = (bool) $settings["open_on_load"];
  $disable_error_alert = (bool) $settings["disable_error_alert"];

  $configuration = "
      window.addEventListener('load', () => {
        window.buildShipChatWidget.config.url = '$endpoint_url';
        window.buildShipChatWidget.config.widgetTitle = '$widget_title';
        window.buildShipChatWidget.config.greetingMessage = '$greeing_message';
        
        window.buildShipChatWidget.config.responseIsAStream = Boolean($response_is_a_stream);
        window.buildShipChatWidget.config.closeOnOutsideClick = Boolean($close_on_outside_click);
        window.buildShipChatWidget.config.openOnLoad = Boolean($open_on_load);
        window.buildShipChatWidget.config.disableErrorAlert = Boolean($disable_error_alert);

        // console.log('responseIsAStream: $response_is_a_stream', Boolean($response_is_a_stream));
        // console.log('closeOnOutsideClick: $close_on_outside_click', Boolean($close_on_outside_click));
        // console.log('openOnLoad: $open_on_load', Boolean($open_on_load));
        // console.log('disableErrorAlert: $disable_error_alert', Boolean($disable_error_alert));

        let open = window.buildShipChatWidget.config.openOnLoad;
        let button = document.querySelector('[data-buildship-chat-widget-button]');

        const container = document.getElementById('buildship-chat-widget-container');
        container.addEventListener('click', () => {
          if(open) {
            window.buildShipChatWidget.close({ target: button });
          } else {
            window.buildShipChatWidget.open({ target: button });
          }
          open = !open;
        });
      });
    ";

  wp_enqueue_script(
    'buildship-chat-widget',
    'https://unpkg.com/@buildshipapp/chat-widget@^1',
    array(),
    null,
    array(
      "strategy" => "defer"
    )
  );
  wp_add_inline_script('buildship-chat-widget', $configuration, "before");
}

function buildship_chat_widget_container()
{
  $settings = ChatWidget::get_settings();
  $button_name = $settings['button_name'];

  include_once (plugin_dir_path(__FILE__) . "views/widget-button-container.php");
}

$isAdmin = is_admin();
if ($isAdmin) {
  include CHAT_WIDGET_DIR . 'class-buildship-chat-widget-admin.php';

  $admin = new ChatWidgetAdmin();
  $admin->add_hooks();
} else {
  add_action('wp_enqueue_scripts', 'buildship_chat_widget_scripts');
  add_action('wp_body_open', 'buildship_chat_widget_container', );
}




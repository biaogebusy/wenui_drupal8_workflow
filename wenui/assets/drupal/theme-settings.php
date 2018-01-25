<?php
/**
 * Implements hook_form_system_theme_settings_alter() function.
 */
function wenui_form_system_theme_settings_alter(&$form, \Drupal\Core\Form\FormStateInterface &$form_state, $form_id = NULL) {
  if (isset($form_id)) {
    return;
  }
  $form['devtools'] = array(
      '#type'  => 'details',
      '#title' => t('Theme development settings'),
      '#open'  => TRUE
  );
  $form['devtools']['wenui_front_rebuild_registry'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Cache theme templates.'),
    '#default_value' => theme_get_setting('wenui_front_rebuild_registry'),
    '#description'   => t('Just Useful on DEV Mode, If Sites will online, Plase off this option.'),
  );
}

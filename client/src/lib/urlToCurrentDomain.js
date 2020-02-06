
/**
 * As API calls may need to be made to either localhost/*****
 * or to [an IP address]/***** this method extracts the protocol
 * (http or https) and hostname from the current page to decide
 * which should be used.
 *
 * Seb in your config file, set the API end point URL to
 * :8080/location/of/php/file/in/your/htdocs.php
 */
export default function urlToCurrentDomain(url) {
  const location = window.location;
  return `${location.protocol}//${location.hostname}${url.replace(/^\//, '')}`;
}
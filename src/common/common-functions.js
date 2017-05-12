export function getPath(component, path) {
    var dir = component.props.location.pathname.search('rtl') !== -1 ? 'rtl' : 'ltr';
    path = `/${dir}/${path}`;
    return path;
}
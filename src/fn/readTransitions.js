function readTransitions(transitions) {
    let out = {
        inFunc: transitions.in ? transitions.in.func : () => { },
        inOptions: transitions.in ? transitions.in.options : null,
        outFunc: transitions.out ? transitions.out.func : () => { },
        outOptions: transitions.out ? transitions.out.options : null
    };
    return out;
}


export default readTransitions;
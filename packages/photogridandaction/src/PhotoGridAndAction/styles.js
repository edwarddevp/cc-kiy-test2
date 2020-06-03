export const imageGrid = {
    gap:2,
    p:2,
};

export const showMoreButtonStyles = {
    transition:'all 0.3s ease',
    bg:'white',
    borderWidth:'1px',
    borderColor:'gray.200',
    justifyContent:'center',
    alignItems:'center',
    cursor:'pointer',
    shadow:'2px 2px 2px #CBD5E0',
    borderRadius:'5px',
    _hover:{bg:'rgb(74,85,104,0.1)'},
};

export const imageWrapper = {
    position:'absolute',
    top:'0px',
    left:'0px',
    h:'100%',
    w:'100%',
    transition:'all 0.3s ease',
    borderRadius:'5px',
    overflow:'hidden',
    _hover:{bg:'rgb(74,85,104,0.1)'},
};

export const imageContainer = {
    borderWidth:'1px',
    bg:'white',
    rounded:'md',
    shadow:'2px 2px 2px #CBD5E0'
};

export const centerGrid = {
    justifyContent:'center',
    alignItems:'center',
};

export const ImageRemoveIcon = {
    bg:'gray.100',
    position:'absolute',
    top:'7px',
    right:'10px',
    size:"xs",
    variant:"outline",
    variantColor:"red",
    ariaLabel:"Send email",
    icon:"close",
    zIndex:5
};

export const ImageSelectedCheckbox = {
    bg:'gray.100',
    position:'absolute',
    top:'7px',
    left:'10px',
    size:'lg',
    variant:"outline",
    variantColor:"green",
    zIndex:5
};


export const iconBottomRight = {
    variant:"ghost",
    position:'absolute',
    bottom:'1px',
    right:'2px',
    fontSize:'25px',
    ariaLabel:"Send email",
    zIndex:3,
    _hover:{bg:"transparent"},
    _focus:{bg:"transparent",outline:'none'},
    _active:{bg:"transparent",outline:'none'}
};

export const triangleWhite = {
    position:'absolute',
    bottom:'0px',
    right:'0px',
    w:'0px',
    h:'0px',
    borderRight: '35px solid #fff',
    borderTop: '35px solid transparent',
    borderLeft: '35px solid transparent',
    borderBottom: '35px solid #fff',
    borderBottomRightRadius:'3px',
    zIndex:2,
    opacity:0.5
};


export const imageType = (image) => {
    return image.ETag ?
        image.agencyId ?
            'AGENCY':
            'GLOBAL':
        'LOCAL'
};
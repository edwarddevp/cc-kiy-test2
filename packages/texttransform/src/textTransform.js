import slugify from 'slugify';

export default function toLowerCase(name) {
  if(name){
    return slugify(name, { replacement: ' ', lower: true });
  }
}

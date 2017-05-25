import { purple400, lightGreen400, yellow400, lightBlue400, grey400 } from 'material-ui/styles/colors';

export default function SwdCard(name, quantity, number, rarity, set) {
  this.name = name;
  this.number = number;
  this.rarity = rarity;
  this.set = set;
  this.quantity = quantity;
  this.getRarityColor = function getRarityColor() {
    let result;
    switch (this.rarity) {
      case 'legendary':
        result = purple400;
        break;
      case 'rare':
        result = lightGreen400;
        break;
      case 'uncommon':
        result = yellow400;
        break;
      case 'common':
        result = lightBlue400;
        break;
      default:
        result = grey400;
    }
    return result;
  };
}

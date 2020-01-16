import Storage from '../services/storage';

const storage = new Storage()

export default {

    getGridSize () {
        let char = storage.get().name.length;
        if (char > 0 && char <= 6) {
            return 3;
        }
        else if (char > 6 && char <=12) {
            return 4;
        }
        else if(char > 12 && char<=23) {
            return 6;
        }
        else if (char> 24) {
            return 12;
        }
    }
}

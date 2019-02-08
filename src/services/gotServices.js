export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api/';
    }

    async getResource (url) {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();      
    };

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }

    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    async getAllBooks() {
        return this.getResource('/books/');
    }

    async getBook(id) {
        return this.getResource(`/books/${id}`);
    }

    async getAllHouses() {
        return this.getResource('/houses/');
    }

    async getHouse(id) {
        return this.getResource(`/houses/${id}`);
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'No data'
        }
    }

    _transformCharacter(char) {
        return {
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse(house) {
        return {
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overlords: this.isSet(house.overlord),
            ancentralWeapons: this.isSet(house.ancentralWeapons)
        }
    }

    _transformBook(book) {
        return {
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publiser: this.isSet(book.publiser),
            released: this.isSet(book.released)
        }
    }
}
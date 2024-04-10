"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
    constructor(data) {
        this.data = data;
    }
    isEmail(key) {
        const regular = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regular.test(this.data[key]))
            throw 'Correo no valido';
    }
    requiredKeys(...keys) {
        keys.forEach(k => {
            if (!this.data[k])
                throw `${k} faltante`;
        });
    }
    isRequired(key) {
        if (!this.data[key])
            throw `${key} faltante`;
    }
    isNumber(key) {
        this.isRequired(key);
        if (isNaN(this.data[key]))
            throw `${key} no es un numero valido`;
        this.data[key] = parseInt(this.data[key]);
    }
    capitalizar(key) {
        this.isRequired(key);
        const str = this.data[key];
        const array = str.split(' ');
        array.forEach((s, i) => {
            var _a;
            if (s.length === 0)
                return;
            s = s.toLowerCase();
            const primarCaracter = (_a = s.at(0)) === null || _a === void 0 ? void 0 : _a.toUpperCase();
            const restoCadena = s.slice(1);
            array[i] = primarCaracter + restoCadena;
        });
        this.data[key] = array.join(' ');
    }
    isBoolean(key) {
        if (typeof this.data[key] !== 'boolean')
            throw `${key} no es un boolean valido`;
    }
    toUpperCase(key) {
        this.isRequired(key);
        this.data[key] = this.data[key].toUpperCase();
    }
    isDate(key) {
        this.isRequired(key);
        const newDate = new Date(this.data[key]);
        if (newDate.toString() === 'Invalid Date')
            throw `${key} no es una fecha valida`;
        this.data[key] = newDate;
    }
    checkPattern(key, pattern) {
        this.isRequired(key);
        if (!pattern.test(this.data[key]))
            throw `${key} no valido`;
    }
}
exports.Validators = Validators;

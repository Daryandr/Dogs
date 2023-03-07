var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function listDogs() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, dogs_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/list", {
                        method: "GET",
                        headers: { "Accept": "application/json" }
                    })];
                case 1:
                    response = _a.sent();
                    if (!(response.ok == true)) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    dogs_1 = document.getElementById("doglist");
                    dogs_1.innerHTML = "";
                    data.forEach(function (dog) {
                        var b = new Date(dog.birthday);
                        dogs_1.innerHTML += "\n                    <li class=\"card\" id=\"".concat(dog._id, "\">\n                      <div class=\"card__id\" style=\"display: none;\">").concat(dog._id, "</div>\n                      <img src=\"/img/dog_icon.png\" style=\"width: 12vmin\">\n                      <h2 style=\"margin: 0\">").concat(dog.name, "</h2>\n                      <p>Breed: ").concat(dog.breed, "</p>\n                      <p>Gender: ").concat(dog.gender, "</p>\n                      <p>Birthday: ").concat(b.toLocaleDateString(), "</p>\n                      <button type=\"button\" onclick=\"editDog(this)\">EDIT</button>\n                      <button type=\"button\" onclick=\"deleteDog(this)\">DELETE</button>\n                    </li>");
                    });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
listDogs();
function getDog(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, dog;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/list/".concat(id), {
                        method: "GET",
                        headers: { "Accept": "application/json" }
                    })];
                case 1:
                    response = _a.sent();
                    if (!(response.ok == true)) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    dog = _a.sent();
                    return [2 /*return*/, dog];
                case 3: return [2 /*return*/, { _id: "", name: "", breed: "", gender: "", birthday: new Date() }];
            }
        });
    });
}
function editDog(el) {
    return __awaiter(this, void 0, void 0, function () {
        var id, card, dog, d, b;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = el.parentElement.querySelector(".card__id").innerHTML;
                    card = document.getElementById(id);
                    return [4 /*yield*/, getDog(id)];
                case 1:
                    dog = _a.sent();
                    if (dog._id != "") {
                        d = new Date(dog.birthday);
                        d = new Date(d.getTime() - (d.getTimezoneOffset() * 60 * 1000));
                        b = d.toISOString().split('T')[0];
                        card.innerHTML = "\n      <div class=\"card__id\" style=\"display: none;\">".concat(id, "</div>\n      <img src=\"/img/dog_icon.png\" style=\"width: 12vmin\">\n      <br/>\n      <form name=\"editForm").concat(id, "\" id=\"editForm").concat(id, "\">\n      <label for=\"name-input\">Name: </label>\n      <input type=\"text\" id=\"name-input\"  name=\"name\" value=\"").concat(dog.name, "\" size=\"12\">\n      <label for=\"breed-input\"><br/>Breed: </label>\n      <input type=\"text\" id=\"breed-input\" name=\"breed\" value=\"").concat(dog.breed, "\" size=\"12\">\n      <label for=\"gender-input\"><br/>Gender: </label>\n      <select id=\"gender-input\" name=\"gender\" style=\"width:120px\">\n        <option value=\"Female\">Female</option>\n        <option id=\"male").concat(id, "\" value=\"Male\">Male</option>\n      </select>\n      <label for=\"brth-input\"><br/>Birthday: </label>\n      <input type=\"date\" id=\"brth-input\" name=\"birthday\" value=\"").concat(b, "\">\n      <br/>\n      <button type=\"button\" onclick=\"cancel(this)\">CANCEL</button>\n      <button type=\"submit\">SUBMIT</button></form>");
                        if (dog.gender === "Male")
                            document.getElementById("male".concat(id)).setAttribute('selected', 'selected');
                        document.getElementById("editForm".concat(id)).addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var form, n, b, g, d, response, data, bd;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        e.preventDefault();
                                        form = e.currentTarget;
                                        n = form.elements[0];
                                        b = form.elements[1];
                                        g = form.elements[2];
                                        d = form.elements[3];
                                        return [4 /*yield*/, fetch("/update", {
                                                method: "POST",
                                                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    _id: id,
                                                    name: n.value,
                                                    breed: b.value,
                                                    gender: g.value,
                                                    birthday: d.value
                                                })
                                            })];
                                    case 1:
                                        response = _a.sent();
                                        if (!(response.ok == true)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, response.json()];
                                    case 2:
                                        data = _a.sent();
                                        bd = new Date(data.birthday);
                                        card.innerHTML = "\n                      <div class=\"card__id\" style=\"display: none;\">".concat(id, "</div>\n                      <img src=\"/img/dog_icon.png\" style=\"width: 12vmin\">\n                      <h2 style=\"margin: 0\">").concat(data.name, "</h2>\n                      <p>Breed: ").concat(data.breed, "</p>\n                      <p>Gender: ").concat(data.gender, "</p>\n                      <p>Birthday: ").concat(bd.toLocaleDateString(), "</p>\n                      <button onclick=\"editDog(this)\">EDIT</button>\n                      <button onclick=\"deleteDog(this)\">DELETE</button>");
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function addDog() {
    var _this = this;
    var list = document.getElementById("doglist");
    var id = Math.random();
    list.innerHTML += "\n      <li class=\"card\" id=\"".concat(id, "\">\n      <img src=\"/img/dog_icon.png\" style=\"width: 12vmin\">\n      <br/>\n      <form name=\"addForm").concat(id, "\" id=\"addForm").concat(id, "\">\n      <label for=\"name-input\">Name: </label>\n      <input type=\"text\" id=\"name-input\"  name=\"name\" size=\"12\">\n      <label for=\"breed-input\"><br/>Breed: </label>\n      <input type=\"text\" id=\"breed-input\" name=\"breed\" size=\"12\">\n      <label for=\"gender-input\"><br/>Gender: </label>\n      <select id=\"gender-input\" name=\"gender\" style=\"width:120px\">\n        <option value=\"Female\">Female</option>\n        <option value=\"Male\">Male</option>\n      </select>\n      <label for=\"brth-input\"><br/>Birthday: </label>\n      <input type=\"date\" id=\"brth-input\" name=\"birthday\">\n      <br/>\n      <button type=\"button\" onclick=\"cancelAdd(").concat(id, ")\">CANCEL</button>\n      <button type=\"submit\">SUBMIT</button></form></li>");
    document.getElementById("addForm".concat(id)).addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
        var form, n, b, g, d, response, data, bd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    form = e.currentTarget;
                    n = form.elements[0];
                    b = form.elements[1];
                    g = form.elements[2];
                    d = form.elements[3];
                    return [4 /*yield*/, fetch("/insert", {
                            method: "POST",
                            headers: { "Accept": "application/json", "Content-Type": "application/json" },
                            body: JSON.stringify({
                                name: n.value,
                                breed: b.value,
                                gender: g.value,
                                birthday: d.value
                            })
                        })];
                case 1:
                    response = _a.sent();
                    if (!(response.ok == true)) return [3 /*break*/, 4];
                    return [4 /*yield*/, cancelAdd(id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    bd = new Date(data.birthday);
                    list.innerHTML += "\n                    <li class=\"card\" id=\"".concat(data._id, "\">\n                      <div class=\"card__id\" style=\"display: none;\">").concat(data._id, "</div>\n                      <img src=\"/img/dog_icon.png\" style=\"width: 12vmin\">\n                      <h2 style=\"margin: 0\">").concat(data.name, "</h2>\n                      <p>Breed: ").concat(data.breed, "</p>\n                      <p>Gender: ").concat(data.gender, "</p>\n                      <p>Birthday: ").concat(bd.toLocaleDateString(), "</p>\n                      <button onclick=\"editDog(this)\">EDIT</button>\n                      <button onclick=\"deleteDog(this)\">DELETE</button>\n                    </li>");
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
function deleteDog(el) {
    return __awaiter(this, void 0, void 0, function () {
        var id, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = el.parentElement.querySelector(".card__id").innerHTML;
                    return [4 /*yield*/, fetch("/delete", {
                            method: "POST",
                            headers: { "Accept": "application/json", "Content-Type": "application/json" },
                            body: JSON.stringify({
                                _id: id
                            })
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok == true) {
                        document.getElementById("".concat(id)).remove();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function cancel(el) {
    return __awaiter(this, void 0, void 0, function () {
        var id, card, dog, b;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = el.parentElement.parentElement.querySelector(".card__id").innerHTML;
                    card = document.getElementById(id);
                    return [4 /*yield*/, getDog(id)];
                case 1:
                    dog = _a.sent();
                    if (dog._id != "") {
                        b = new Date(dog.birthday);
                        card.innerHTML = "\n                      <div class=\"card__id\" style=\"display: none;\">".concat(id, "</div>\n                      <img src=\"/img/dog_icon.png\" style=\"width: 12vmin\">\n                      <h2 style=\"margin: 0\">").concat(dog.name, "</h2>\n                      <p>Breed: ").concat(dog.breed, "</p>\n                      <p>Gender: ").concat(dog.gender, "</p>\n                      <p>Birthday: ").concat(b.toLocaleDateString(), "</p>\n                      <button onclick=\"editDog(this)\">EDIT</button>\n                      <button onclick=\"deleteDog(this)\">DELETE</button>");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function cancelAdd(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            document.getElementById("".concat(id)).remove();
            return [2 /*return*/];
        });
    });
}

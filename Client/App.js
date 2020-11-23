"use strict";
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
        while (_) try {
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var native_1 = require("@react-navigation/native");
var stack_1 = require("@react-navigation/stack");
// import ApiService from './services/ApiService';
var ApiService_1 = require("./services/ApiService");
var Home_1 = require("./screens/home/Home");
var Login_1 = require("./screens/login/Login");
var Form_1 = require("./screens/form/Form");
var Entries_1 = require("./screens/entries/Entries");
var Search_1 = require("./screens/search/Search");
var Analysis_1 = require("./screens/analysis/Analysis");
var Ui_1 = require("./screens/ui/Ui");
var Overview_1 = require("./screens/overview/Overview");
var react_native_1 = require("react-native");
var Stack = stack_1.createStackNavigator();
function App() {
    var _this = this;
    var _a = react_1.useState([]), currentUser = _a[0], setCurrentUser = _a[1];
    var _b = react_1.useState([]), userEntries = _b[0], setUserEntries = _b[1];
    react_1.useEffect(function () {
        if (currentUser.length > 0) {
            console.log(currentUser);
            var id = currentUser[0].id;
            ApiService_1.getUserEntries(id).then(function (data) {
                setUserEntries(data[0].entries);
            });
        }
    }, [currentUser]);
    var postEntry = function (entry) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ApiService_1.postEntryRequest(entry)];
                case 1:
                    res = _a.sent();
                    if (res) {
                        setUserEntries(function (prev) {
                            return __spreadArrays(prev, [res[0]]);
                        });
                        react_native_1.Alert.alert('Entry created succesful');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var registerUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ApiService_1.registerUserRequest(user)];
                case 1:
                    res = _a.sent();
                    if (res) {
                        setCurrentUser(res);
                        react_native_1.Alert.alert('User created succesfully');
                    }
                    else {
                        react_native_1.Alert.alert('Username already taken');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var loginUser = function (user) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ApiService_1.loginUserRequest(user)];
                case 1:
                    res = _a.sent();
                    if (res) {
                        setCurrentUser(res);
                        react_native_1.Alert.alert('User logged in succesfully');
                    }
                    else {
                        react_native_1.Alert.alert('Username or password incorrect');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var deleteOne = function (id) {
        // return delHelper(ApiService.deleteOne, id, setUserEntries);
    };
    var resetUser = function () {
        setCurrentUser([]);
        setUserEntries([]);
    };
    return (<>
      <native_1.NavigationContainer>
        <Stack.Navigator>
          
          <Stack.Screen name="Home">{function (props) { return <Home_1["default"] {...props}/>; }}</Stack.Screen>

          <Stack.Screen name="Login">
            {function (props) { return (<Login_1["default"] {...props} registerUser={registerUser} loginUser={loginUser} currentUser={currentUser}/>); }}
          </Stack.Screen>

          <Stack.Screen name="Ui">{function (props) { return <Ui_1["default"] {...props} currentUser={currentUser}/>; }}</Stack.Screen>

          <Stack.Screen name="Form">
            {function (props) { return <Form_1["default"] {...props} currentUser={currentUser} postEntry={postEntry}/>; }}
          </Stack.Screen>

          <Stack.Screen name="Entries">
            {function (props) { return <Entries_1["default"] {...props} deleteOne={deleteOne} userEntries={userEntries}/>; }}
          </Stack.Screen>

          <Stack.Screen name="Search">
            {function (props) { return <Search_1["default"] {...props} userEntries={userEntries} deleteOne={deleteOne}/>; }}
          </Stack.Screen>

          <Stack.Screen name="Analysis">{function (props) { return <Analysis_1["default"] {...props} userEntries={userEntries}/>; }}</Stack.Screen>

          <Stack.Screen name="Overview">
            {function (props) { return <Overview_1["default"] {...props} userEntries={userEntries} deleteOne={deleteOne}/>; }}
          </Stack.Screen>
        </Stack.Navigator>
      </native_1.NavigationContainer>
    </>);
}
exports["default"] = App;

import moment from "moment";
import api, { UniResponse } from "./api";
import { Dictionary } from "./types";
import { globalContext } from "./globalContext";
import { buildCacheKey, fromCache } from "./cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const safeSplit = (val: string, splitter: string, index: number) => {
  if(isNullOrWhitespace(val))
    return val;

  if(isNullOrWhitespace(splitter))
    return val;

  if(val.indexOf(splitter) < 0)
    return val;

  const spts = val.split(splitter);
  if(index >= spts.length)
    return val;

  return spts[index];
}

export const safeString = (val: any): string => {
  if (val === 0) return val;

  if (!val) return "";

  return val;
};

export const safeNumber = (val: any) => {
  if (!val) return 0;

  return val;
};

export const isNumber = (n: any) => { 
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

export const numberWithCommas = (val:number) => {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const isNullOrWhitespace = (txt: string | null | undefined) => {
  if (typeof txt === "undefined" || txt == null || txt == undefined || txt == "undefined") 
    return true;

  return txt.replace(/\s/g, "").length < 1;
};

export const safeToString = (value: any): string => {
  if (typeof value === "string") 
    return value as string;

  if (typeof value === "undefined" || value == "undefined" || value == null || value == undefined) 
    return ""

  if(value === 0)
    return "0"
  
  if(value.toString)
    return value.toString();

  return "";
};

export const getMap = <T>(mapCode: string, category?: string): Promise<UniResponse<T, any>> => {
  return api("get", "/map", { mapCode, category });
};

export const getMapCache = <T>(mapCode: string, category?: string): Promise<void | UniResponse<T, any>> => {
  const cached = fromCache(buildCacheKey(mapCode, category));
  if(cached){
    return new Promise<void | UniResponse<T, any>>((resolve, _) => {
      resolve({ data: cached } as UniResponse<T, any>);
    });
  }    

  return api("get", "/map", { mapCode, category }).then((result) => {  
    globalContext.cacheDic[buildCacheKey(mapCode, category)] = result.data
    return result;
  }).catch(error => {
    console.log(error);
  }) as Promise<void | UniResponse<T, any>>;
};

export const validateForm = (mustField: string[], values: Dictionary): boolean => {
  return !mustField.find((x) => isNullOrWhitespace(values[x]));
};

export const dateFormat = (date: any, format: string = "YYYY-MM-DD HH:mm") => {
  if(!date)
    return "";

  return moment(date).format(format);
}

export const dayFormat = (date: any = new Date(), format: string = "YYYY-MM-DD") => {
  if(!date)
    return "";

  return moment(date).format(format);
}

export const fromNow = (date: any) => {
  if(!date)
    return "";

  return moment(date).fromNow();
}

export const padLeft = (s: string, length: number) => {
  return s?.padStart(length, '0');
}

export const padLeftNum = (n: number, length: number) => {
  return padLeft(n?.toString(), length);
}

export const toHHMM = (min: number) => {
  const minutes = Math.floor(min % 60);
  const hours = Math.floor(min / 60);

  return `${padLeftNum(hours, 2)}:${padLeftNum(minutes, 2)}`;
}

export const currencyFormat = (currency: number, sign: string = '') => {
  if(!currency && currency !== 0)
    return "";

  const sansDec = currency.toFixed(0);
  const formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${sign}${formatted}`;
}

export const floatFormat = (num: number, fixed: number = 2) => {
  if(!num && num !== 0)
    return "";

  num = parseFloat(num as any);
  if(!num && num !== 0)
    return "";

  const formatted = num.toFixed(fixed);
  return `${formatted}`;
}

export const percentFormat = (num: number, fixed: number = 2) => {
  if(!num && num !== 0)
    return "";

  num = parseFloat(num as any);
  if(!num && num !== 0)
    return "";    

  const formatted = num.toFixed(fixed);
  return `${formatted}%`;
}

export const devideFormat = (num: number, denom: number, fixed: number = 2, postfix: string = '%') => {
  if(!num && num !== 0)
    return "";

  if(!denom && denom !== 0)
    return "";

  const formatted = (num / denom * 100).toFixed(fixed);
  return `${formatted}${postfix}`;
}

export const nullGuard = (val: any, defaultValue: any = "") => {
  if(val === null || val === undefined)
    return defaultValue;

  return val;
}

export const executeIdle = (fn: () => void, ms: number = 10) => {
  setTimeout(() => {
    fn();
  }, ms);
}

export const toQueryString = (param: Dictionary) => {
  return Object.keys(param).map((key) => {
    if(isNullOrWhitespace(safeToString(param[key])))
      return "";
    return encodeURIComponent(key) + '=' + encodeURIComponent(param[key])
  }).join('&');
}

export const easeOutCirc = (x: number): number => {
	return Math.sqrt(1 - Math.pow(x - 1, 2));
}

export const easeOutQuad = (x: number): number => {
	return 1 - (1 - x) * (1 - x) * (1 - x) * (1 - x) * (1 - x);
}

export const yyyymmddhhmmss = () => {
  return (new Date()).toISOString().replace(/[^0-9]/g, '').slice(0, -3);
}

export const snakeCaseToCamelCase = (input: string) =>
  input
    .split("_")
    .reduce(
      (res, word, i) =>
        i === 0
          ? word.toLowerCase()
          : `${res}${word.charAt(0).toUpperCase()}${word
              .substring(1)
              .toLowerCase()}`,
      ""
    );

export const jsonToCamelCase = (json: Dictionary) => {
  const result: Dictionary = {};
  Object.keys(json).forEach((key) => {
    result[snakeCaseToCamelCase(key)] = json[key];
  });
  return result;
}

export const listToCamelCase = (list: Dictionary[]) => {
  return list.map((x) => jsonToCamelCase(x));
}

export const toKebabCase = (str: string) => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase().split("-").filter(x => x != "").join("-");
}

export const merge = (a: any[], b: any[], i = 0) => {
  return a.slice(0, i).concat(b, a.slice(i));
}


export const randomString = (length: number) : string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * 47 * 73  %  characters.length);
      result += characters[randomIndex];
  }
  return result;
}

export const compareVersions = (currentVersion: string, latestVersion: string): boolean => {
  const currentVersionParts = currentVersion.split('.').map(Number);
  const latestVersionParts = latestVersion.split('.').map(Number);

  for (let i = 0; i < Math.max(currentVersionParts.length, latestVersionParts.length); i++) {
    const current = currentVersionParts[i] || 0;
    const latest = latestVersionParts[i] || 0;

    if (current > latest) {
      return true;
    } else if (current < latest) {
      return false;
    }
  }

  return true;
};

export const toStorage = async (dic: Dictionary) => {
  const entries = Object.entries(dic);
  const pairs: [string, string][] = entries.map(([key, value]) => [key, JSON.stringify(value)]); 

  AsyncStorage.multiSet(pairs);
}

export const fromStorage = async (keys: string[]) => {    
  const pairs = await AsyncStorage.multiGet(keys);
  const dic: Dictionary = {};

  pairs.forEach(([key, value]) => {
    dic[key] = JSON.parse(value || 'null');
  });

  return dic;
}

export const removeStorage = async (keys: string[]) => {
  await AsyncStorage.multiRemove(keys);
}


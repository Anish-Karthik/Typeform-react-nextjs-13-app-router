"use client"
// import { getCode, getName } from "country-list";
import { Country, State, City, ICountry, IState, ICity } from "country-state-city";
import Select from "react-select";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function CountryStateCityForm() {
  const [selectedCountry, setSelectedCountry] = useState<ICountry| null>(null);
  const [selectedState, setSelectedState] = useState<IState| null>(null);
  const [selectedCity, setSelectedCity] = useState<ICity| null>(null);
  useEffect(() => {
    console.log(selectedCountry);
    console.log(selectedCountry?.isoCode);
    console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);
  return (
    <div className="App">
      <Select
        unstyled
        classNames={{ 
          container: () => "bg-primary border-2 border-red-100 border-solid m-2 rounded-md text-primary-foreground",
          control: () => "pl-2",
          menuList: () => "bg-primary z-20 border-2 border-gray border-solid rounded-md",
          option: (state) => cn("p-1 bg-primary pl-1 ", state.isSelected && "!bg-primary-foreground text-black font-bold", state.isFocused && "bg-slate-400 text-black font-bold"),
          indicatorSeparator: () => "bg-white mr-2 my-2",
          dropdownIndicator: () => "text-white pr-2",
        }}
        options={Country.getAllCountries()}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCountry}
        onChange={(item) => {
          setSelectedCountry(item);
        }}
      />
      <Select
        unstyled
        classNames={{ 
          container: () => "bg-primary border-2 border-red-100 border-solid m-2 rounded-md text-primary-foreground",
          control: () => "pl-2",
          menuList: () => "bg-primary z-20 border-2 border-gray border-solid rounded-md",
          option: (state) => cn("p-1 bg-primary pl-1 ", state.isSelected && "!bg-primary-foreground text-black font-bold", state.isFocused && "bg-slate-400 text-black font-bold"),
          indicatorSeparator: () => "bg-white mr-2 my-2",
          dropdownIndicator: () => "text-white pr-2",
        }}
        options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedState}
        onChange={(item) => {
          setSelectedState(item);
        }}
      />
      <Select
        unstyled
        classNames={{ 
          container: () => "bg-primary border-2 border-red-100 border-solid m-2 rounded-md text-primary-foreground",
          control: () => "pl-2",
          menuList: () => "bg-primary z-20 border-2 border-gray border-solid rounded-md",
          option: (state) => cn("p-1 bg-primary pl-1 ", state.isSelected && "!bg-primary-foreground text-black font-bold", state.isFocused && "bg-slate-400 text-black font-bold"),
          indicatorSeparator: () => "bg-white mr-2 my-2",
          dropdownIndicator: () => "text-white pr-2",
        }}
        options={City.getCitiesOfState(
          selectedState?.countryCode || "",
          selectedState?.isoCode || ""
        )}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCity}
        onChange={(item) => {
          setSelectedCity(item);
        }}
      />
    </div>
  );
}

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BottomNavigationStyled, HeaderWithBorder } from "../components/header";

interface TFormData {
  name: string;
  email: string;
  body: string;
}

function AddComment() {
  let history = useHistory();
  const [navValue, setNavValue] = useState<number>(0);
  const { control, setValue, handleSubmit } = useForm<TFormData>();
  const onSubmit = (data: TFormData) => {
    console.log(data);
  };

  const TextFieldWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  return (
    <main>
      <HeaderWithBorder>
        <BottomNavigationStyled
          value={navValue}
          onChange={(event, newValue) => {
            setNavValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction
            label="Homepage"
            icon={<HomeIcon />}
            onClick={() => history.push("/")}
          />
        </BottomNavigationStyled>
      </HeaderWithBorder>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextFieldWrapper>
          <label>Name</label>
          <Controller
            as={TextField}
            name="name"
            control={control}
            defaultValue={""}
          />
          <label>E-mail</label>
          <Controller
            as={TextField}
            name="email"
            control={control}
            defaultValue={""}
          />
          <label>Text</label>
          <Controller
            as={TextField}
            name="body"
            control={control}
            defaultValue={""}
          />
          <Button
            color="primary"
            onClick={() => {
              setValue("lastName", "luo");
              setValue("firstName", true);
            }}
          >
            Add
          </Button>
        </TextFieldWrapper>
      </form>
    </main>
  );
}
export default AddComment;

// zawiera formularz z polami: nazwa ( min. 3 znaki, tylko litery), email ( poprawny format email), treść (min 2 znaki, dowolne alfanumeryczne)

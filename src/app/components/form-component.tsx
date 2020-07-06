import React from "react";
import { Controller, useForm } from "react-hook-form";
import MaterialUIInput from "@material-ui/core/Input";
import styled from "styled-components";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { addCommentAction } from "../screens/actions/add-comment-action";
import { TRootState } from "../reducers";
import _ from "lodash";
import "./form-components.style.css";

interface TFormData {
  name: string;
  email: string;
  body: string;
}

function CustomForm() {
  const { control, handleSubmit, errors } = useForm<TFormData>();

  let dispatch = useDispatch();

  const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector;
  const nextId: number = useTypedSelector(
    (state) => _.chain(state.data.comments).map("id").max().value() + 1
  );
  const nextPostId: number = useTypedSelector(
    (state) => _.chain(state.data.comments).map("postId").max().value() + 1
  );
  const onSubmit = (data: TFormData) => {
    dispatch(
      addCommentAction({
        name: data.name,
        email: data.email,
        body: data.body,
        id: nextId,
        postId: nextPostId,
        selected: false,
      })
    );
  };
  const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const Label = styled.label`
    line-height: 2;
    text-align: left;
    display: block;
    margin-bottom: 13px;
    margin-top: 20px;
    color: black;
    font-size: 14px;
    font-weight: 200;
  `;
  const Input = styled.input`
    background: #2196f3;
    color: white;
    text-transform: uppercase;
    border: none;
    margin-top: 40px;
    padding: 20px;
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 10px;
  `;
  const LabelAndInputWrapper = styled.div`
    width: 500px;
  `;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <LabelAndInputWrapper>
        <Label>{"Name"}</Label>
        <Controller
          as={MaterialUIInput}
          name={"name"}
          control={control}
          rules={{
            required: true,
            minLength: 3,
            pattern: /^[a-zA-Z ]{3,}$/i,
          }}
          defaultValue=""
          className="controller"
        />
      </LabelAndInputWrapper>
      {errors.name && errors.name.type === "minLength" && (
        <span>Min length is 3</span>
      )}
      {errors.name && errors.name.type === "pattern" && (
        <span>Invalid characters used</span>
      )}
      <LabelAndInputWrapper>
        <Label>{"Email"}</Label>
        <Controller
          as={MaterialUIInput}
          name={"email"}
          control={control}
          rules={{
            required: true,
            pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]+$/i,
          }}
          defaultValue=""
          className="controller"
        />
      </LabelAndInputWrapper>
      {errors.email && "Email is required in proper pattern"}
      <LabelAndInputWrapper>
        <Label>{"Text"}</Label>
        <Controller
          as={MaterialUIInput}
          name={"body"}
          control={control}
          rules={{
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z0-9,.]{2,}$/i,
          }}
          defaultValue=""
          className="controller"
        />
      </LabelAndInputWrapper>
      {errors.body && errors.body.type === "minLength" && (
        <span>Min length is 2</span>
      )}
      {errors.body && errors.body.type === "pattern" && (
        <span>Invalid characters used</span>
      )}
      <Input type="submit" value="Add New Comment" />
    </Form>
  );
}

export default CustomForm;

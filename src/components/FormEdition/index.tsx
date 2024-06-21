import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  developerStage: string;
  age: number;
}

const FormEdition = () => {

  // Valores iniciais do formulário
  const defaultValues = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    developerStage: 'Intermediário',
    age: 32
  };

  const validation = () => {
    return {
      firstName: {
        required: 'Campo obrigatório',
        minLength: { value: 4, message: 'O campo deve ter no mínimo 4 caracteres' }
      },
      lastName: {
        required: 'Campo obrigatório',
        minLength: { value: 4, message: 'O campo deve ter no mínimo 4 caracteres' }
      },
      email: {
        required: 'Campo obrigatório',
        pattern: {
          value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
          message: 'Endereço de email inválido'
        }
      },
      age: {
        min: { value: 18, message: 'O valor deve ser no mínimo 18' },
        max: { value: 99, message: 'O valor deve ser no máximo 99' },
      },
    };
  }

  // getValues - obtem os valores do formulário em associação com o register, quando registramos um campo o react hook forms
  // começa a monitorar o estado desse campo
  // register - registrado o campo a ser monitora o estado
  const { register, handleSubmit, watch, getValues, control, formState: { errors } } = useForm<FormData>({
    defaultValues,
  });

  console.log(errors)

  //assistir as mudanças podem assistir todos ou campos especificos
  const watchAllFields = watch();
  const watchFirstName = watch('firstName');

  // handleSubmit - só vai ser acionado caso não existam erros no formulário
  // SubmitHandler - garante que a função receberá os tipos de dados corretos no caso os dados do tipo FormData
  const onSubmit: SubmitHandler<FormData> = () => {
    const currentValues = getValues();
    // console.log('send', data)
    console.log('currentValues', currentValues)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label>*First Name</label>
        <input {...register("firstName", validation().firstName)} placeholder="First Name" />
        <span className="error">{errors.firstName?.message}</span>
      </div>

      <div className="field">
        <label>*Age</label>
        <input type="number" {...register("age", validation().age)} placeholder="Age" />
        <span className="error">{errors.age?.message}</span>
      </div>

      <div className="field">
        <label>Last Name</label>
        <input {...register("lastName", validation().lastName)} placeholder="Last Name" />
        <span className="error">{errors.lastName?.message}</span>
      </div>

      <div className="field">
        <label>Email</label>
        <input {...register("email", validation().email)} placeholder="Email" />
        <span className="error">{errors.email?.message}</span>
      </div>

      <select defaultValue={defaultValues.developerStage} {...register('developerStage')}>
        <option value="Iniciante">Iniciante</option>
        <option value="Intermediário">Intermediário</option>
        <option value="Avançado">Avançado</option>
      </select>

      <div>
        <p>Watched First Name: {JSON.stringify(watchFirstName)}</p>
        <p>Watched All Fields: {JSON.stringify(watchAllFields)}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default FormEdition;
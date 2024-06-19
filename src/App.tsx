import { useForm, SubmitHandler } from "react-hook-form";
import './styles.css'

type StageBusiness = {
  beginner: string;
  intermediary: string;
  advanced: string;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  stageBusiness: string;
}

const MyForm = () => {
  // Valores iniciais do formulário
  const defaultValues = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    stageBusiness: 'Intermediário'
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
      }
    };
  }

  // getValues - obtem os valores do formulário em associação com o register, quando registramos um campo o react hook forms
  // começa a monitorar o estado desse campo
  // register - registrado o campo a ser monitora o estado
  const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm<FormData>({
    defaultValues,
  });

  console.log(errors)

  // handleSubmit - só vai ser acionado caso não existam erros no formulário
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    const currentValues = getValues();
    console.log('send', data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label>*First Name</label>
        <input {...register("firstName", validation().firstName)} placeholder="First Name" />
        <span className="error">{errors.firstName?.message}</span>
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

      <select {...register("stageBusiness")} defaultValue={"stageBusiness"}>
        <option value="Iniciante">Iniciante</option>
        <option value="Intermediário">Intermediário</option>
        <option value="Avançado">Avançado</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;

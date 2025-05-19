import { useParams } from 'react-router-dom';

const OrdenEnviadaPage = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">¡Orden enviada!</h1>
      <p>Tu orden con ID <strong>{id}</strong> fue enviada al vendedor. Te notificaremos cuando sea aceptada o rechazada.</p>
    </div>
  );
};

export default OrdenEnviadaPage;

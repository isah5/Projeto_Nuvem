import React, { useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";
      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error(`Erro na rede: ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center min-h-screen font-inter">
      <div className="container mx-auto p-6 max-w-2xl text-center">
        {/* Card principal */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            Projeto Fase 1 - Consulta ao Backend
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Clique no botão abaixo para fazer uma requisição do backend 
          </p>

          {/* Botão */}
          <button
            onClick={handleFetch}
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Carregando..." : "Buscar Dados"}
          </button>

          {/* Área de resposta */}
          <div className="mt-8 text-left bg-gray-100 dark:bg-gray-900 rounded-lg p-6 shadow-inner min-h-[100px] transition-all duration-300">
            {loading && (
              <p className="text-gray-500 dark:text-gray-400 animate-pulse">
                Carregando dados do backend...
              </p>
            )}
            {error && (
              <>
                <h3 className="text-lg font-semibold mb-2 text-red-500">
                  Ocorreu um Erro:
                </h3>
                <pre className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm p-4 rounded-md">
                  <code>{error}</code>
                </pre>
              </>
            )}
            {response && (
              <>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                  Resposta Recebida:
                </h3>
                <pre className="bg-gray-200 dark:bg-gray-700 text-sm p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
                  <code>{JSON.stringify(response, null, 2)}</code>
                </pre>
              </>
            )}
            {!loading && !response && !error && (
              <p className="text-gray-500 dark:text-gray-400">
                A resposta do backend aparecerá aqui...
              </p>
            )}
          </div>
        </div>

        <footer className="mt-6 text-sm text-gray-500">
          <p>
            Usando a API de exemplo{" "}
            <a
              href="https://jsonplaceholder.typicode.com/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              JSONPlaceholder
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}

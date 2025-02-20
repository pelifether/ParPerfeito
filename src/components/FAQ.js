import React from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "Como essa 'calculadora do amor' determina minhas chances de encontrar um par ideal?",
            answer: "Nossa calculadora de amor usa dados oficiais do IBGE sobre a população brasileira para calcular suas chances de encontrar um par ideal. Analisamos múltiplos fatores demográficos para determinar sua probabilidade de match perfeito no Brasil, considerando características específicas que você procura em um relacionamento."
        },
        {
            question: "Como calcular a compatibilidade em um relacionamento?",
            answer: "Nossa calculadora de compatibilidade relacionamento considera diversos fatores como idade, localização, educação e preferências pessoais. Diferente de outros métodos para encontrar parceiro ideal, usamos dados reais da população brasileira para calcular suas chances de um match perfeito Brasil."
        },
        {
            question: "Quais são as chances de encontrar amor verdadeiro na minha cidade?",
            answer: "As chances de encontrar amor variam por cidade, baseado em dados demográficos locais. Nossa calculadora relacionamento perfeito considera a população da sua região, ajustando as probabilidades de encontrar par ideal na sua cidade específica, tornando o cálculo mais preciso e relevante."
        },
        {
            question: "Quanto tempo leva para encontrar um par ideal no Brasil?",
            answer: "O tempo para encontrar amor verdadeiro varia para cada pessoa. Nossa calculadora amor compatível ajuda você a entender suas chances estatísticas, mas também sugere como aumentar suas probabilidades de encontrar parceiro ideal ajustando seus critérios de busca."
        },
        {
            question: "Como a calculadora amor Brasil considera diferentes critérios de busca?",
            answer: "Nossa calculadora relacionamento analisa cada critério que você seleciona - idade, educação, estado civil, entre outros - e calcula precisamente como cada escolha afeta suas chances de encontrar amor. Quanto mais específicos seus critérios, mais precisa será sua busca amor verdadeiro."
        },
        {
            question: "Por que usar uma calculadora de compatibilidade relacionamento?",
            answer: "Uma calculadora amor Brasil oferece perspectiva realista sobre suas chances de encontrar par ideal. Diferente de aplicativos de dating calculator tradicionais, fornecemos dados estatísticos reais sobre probabilidade encontrar parceiro ideal, ajudando em decisões mais informadas na sua busca por amor."
        },
        {
            question: "Como aumentar minhas chances de um match perfeito Brasil?",
            answer: "Para aumentar suas chances relacionamento, nossa calculadora par ideal sugere ajustes em seus critérios de busca. Analisamos como cada preferência afeta sua probabilidade de encontrar amor verdadeiro, permitindo decisões mais estratégicas na busca por um relacionamento perfeito."
        },
        {
            question: "A calculadora considera diferentes tipos de relacionamento?",
            answer: "Sim, nossa calculadora amor compatível é versátil e considera diversos tipos de busca amor verdadeiro. Seja procurando um relacionamento tradicional ou alternativo, calculamos suas chances encontrar amor com base em dados demográficos reais do Brasil."
        },
        {
            question: "Como os dados demográficos influenciam as chances de encontrar um par ideal?",
            answer: "Nossa dating calculator Brasil usa estatísticas populacionais atualizadas para calcular probabilidade encontrar parceiro ideal. Consideramos distribuições demográficas reais em cada região, fornecendo um panorama preciso de suas chances relacionamento perfeito."
        },
        {
            question: "Qual a precisão da calculadora de compatibilidade?",
            answer: "Nossa calculadora par ideal utiliza dados oficiais do IBGE para garantir máxima precisão nas chances encontrar amor. Atualizamos regularmente nossa base de dados para manter cálculos precisos sobre probabilidade match perfeito Brasil em tempo real."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Perguntas Frequentes Sobre Como Encontrar Seu Par Ideal
            </h2>
            <div className="grid gap-6 md:gap-8">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow relative z-10">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {faq.question}
                        </h3>
                        <p className="text-gray-600">
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ; 
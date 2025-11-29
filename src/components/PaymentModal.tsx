import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'sonner';
import { trpc } from '../lib/trpc';

interface PaymentModalProps {
    plan: {
        id: string;
        name: string;
        price: number;
        currency: string;
        interval: string;
    };
    onClose: () => void;
}

function PaymentModal({ plan, onClose }: PaymentModalProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'boleto'>('card');
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        cpf: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            // Create payment intent
            const result = await trpc.createPaymentIntent.mutate({
                planId: plan.id,
                paymentMethod,
                customerInfo,
            });

            if (result.success && result.clientSecret) {
                if (paymentMethod === 'card') {
                    const cardElement = elements.getElement(CardElement);
                    if (!cardElement) {
                        throw new Error('Card element not found');
                    }

                    const { error, paymentIntent } = await stripe.confirmCardPayment(result.clientSecret, {
                        payment_method: {
                            card: cardElement,
                            billing_details: {
                                name: customerInfo.name,
                                email: customerInfo.email,
                                phone: customerInfo.phone,
                            },
                        },
                    });

                    if (error) {
                        throw new Error(error.message);
                    }

                    if (paymentIntent?.status === 'succeeded') {
                        toast.success('Pagamento realizado com sucesso!');
                        onClose();
                    }
                } else if (paymentMethod === 'pix') {
                    const { error } = await stripe.confirmPixPayment(result.clientSecret, {
                        payment_method: {
                            billing_details: {
                                name: customerInfo.name,
                                email: customerInfo.email,
                            },
                        },
                    });

                    if (error) {
                        throw new Error(error.message);
                    }

                    // Show PIX QR Code
                    toast.success('PIX gerado! Escaneie o QR Code para pagar.');
                } else if (paymentMethod === 'boleto') {
                    const { error } = await stripe.confirmBoletoPayment(result.clientSecret, {
                        payment_method: {
                            boleto: {
                                tax_id: customerInfo.cpf || '',
                            },
                            billing_details: {
                                name: customerInfo.name,
                                email: customerInfo.email,
                                address: {
                                    line1: 'Rua Exemplo, 123',
                                    city: 'São Paulo',
                                    state: 'SP',
                                    postal_code: '01234-567',
                                    country: 'BR',
                                },
                            },
                        },
                    });

                    if (error) {
                        throw new Error(error.message);
                    }

                    toast.success('Boleto gerado! Verifique seu email.');
                }
            }
        } catch (error: any) {
            toast.error(error.message || 'Erro ao processar pagamento');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: 'var(--space-md)',
            }}
            onClick={onClose}
        >
            <div
                className="card"
                style={{
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    padding: 'var(--space-2xl)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0' }}>Finalizar Pagamento</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-muted)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            padding: '0.5rem',
                        }}
                    >
                        ×
                    </button>
                </div>

                <div style={{ background: 'rgba(255, 107, 53, 0.1)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{plan.name}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0' }}>
                                Pagamento {plan.interval}
                            </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                                R$ {plan.price.toLocaleString('pt-BR')}
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="form-label">Método de Pagamento</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-sm)' }}>
                            {(['card', 'pix', 'boleto'] as const).map((method) => (
                                <button
                                    key={method}
                                    type="button"
                                    onClick={() => setPaymentMethod(method)}
                                    className={paymentMethod === method ? 'btn btn-primary' : 'btn btn-secondary'}
                                    style={{ padding: '0.75rem' }}
                                >
                                    {method === 'card' && '💳 Cartão'}
                                    {method === 'pix' && '📱 PIX'}
                                    {method === 'boleto' && '📄 Boleto'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nome Completo *</label>
                        <input
                            type="text"
                            id="name"
                            className="form-input"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email *</label>
                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                value={customerInfo.email}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">Telefone *</label>
                            <input
                                type="tel"
                                id="phone"
                                className="form-input"
                                value={customerInfo.phone}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {paymentMethod === 'boleto' && (
                        <div className="form-group">
                            <label htmlFor="cpf" className="form-label">CPF/CNPJ *</label>
                            <input
                                type="text"
                                id="cpf"
                                className="form-input"
                                value={customerInfo.cpf}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, cpf: e.target.value })}
                                required
                            />
                        </div>
                    )}

                    {paymentMethod === 'card' && (
                        <div className="form-group">
                            <label className="form-label">Dados do Cartão *</label>
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '2px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#fff',
                                                '::placeholder': {
                                                    color: '#B8B8B8',
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || !stripe}
                        style={{ width: '100%', marginTop: 'var(--space-md)' }}
                    >
                        {loading ? (
                            <>
                                <span className="loading"></span>
                                Processando...
                            </>
                        ) : (
                            <>
                                {paymentMethod === 'card' && 'Pagar com Cartão'}
                                {paymentMethod === 'pix' && 'Gerar PIX'}
                                {paymentMethod === 'boleto' && 'Gerar Boleto'}
                                {' →'}
                            </>
                        )}
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-md)', marginBottom: '0' }}>
                        🔒 Pagamento 100% seguro via Stripe
                    </p>
                </form>
            </div>
        </div>
    );
}

export default PaymentModal;

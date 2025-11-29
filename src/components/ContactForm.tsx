import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { trpc } from '../lib/trpc';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await trpc.submitContact.mutate(formData);

            if (result.success) {
                toast.success(result.message, {
                    duration: 4000,
                });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    message: '',
                });
            }
        } catch (error: any) {
            toast.error(error.message || 'Erro ao enviar mensagem. Tente novamente.', {
                duration: 4000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--space-2xl)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-md)' }}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nome completo *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Seu nome completo"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="seu@email.com"
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-md)' }}>
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Telefone *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-input"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="(00) 00000-0000"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="company" className="form-label">Empresa</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            className="form-input"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Nome da sua empresa"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="message" className="form-label">Mensagem *</label>
                    <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Conte-nos sobre seus desafios e objetivos de crescimento..."
                        style={{ minHeight: '150px' }}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ width: '100%', marginTop: 'var(--space-md)' }}
                >
                    {loading ? (
                        <>
                            <span className="loading"></span>
                            Enviando...
                        </>
                    ) : (
                        <>
                            Enviar Mensagem →
                        </>
                    )}
                </button>

                <p style={{
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    marginTop: 'var(--space-md)',
                    marginBottom: '0'
                }}>
                    Responderemos em até 24 horas úteis
                </p>
            </form>
        </div>
    );
}

export default ContactForm;

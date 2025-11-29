import { useState, useEffect } from 'react';
import { trpc } from '../lib/trpc';

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
}

function ServicesGrid() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const data = await trpc.getServices.query();
            setServices(data);
        } catch (error) {
            console.error('Error loading services:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
                <div className="loading"></div>
            </div>
        );
    }

    return (
        <div className="grid grid-3">
            {services.map((service, index) => (
                <div
                    key={service.id}
                    className="card fade-in-up"
                    style={{
                        animationDelay: `${index * 100}ms`,
                        textAlign: 'center',
                        padding: 'var(--space-2xl)'
                    }}
                >
                    <div className="icon" style={{
                        fontSize: '3.5rem',
                        marginBottom: 'var(--space-lg)',
                        filter: 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.3))'
                    }}>
                        {service.icon}
                    </div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        marginBottom: 'var(--space-md)',
                        color: 'var(--color-primary)',
                        fontWeight: '700'
                    }}>
                        {service.title}
                    </h3>
                    <p style={{
                        marginBottom: '0',
                        fontSize: '1.05rem',
                        lineHeight: '1.7'
                    }}>
                        {service.description}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ServicesGrid;

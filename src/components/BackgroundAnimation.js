import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
    const emojis = ['🎲', '💘', '🎰'];
    const items = Array.from({ length: 15 }, (_, i) => ({
        emoji: emojis[i % emojis.length],
        size: Math.random() * 60 + 20, // 20-80px
        left: Math.random() * 100, // 0-100%
        delay: Math.random() * 5, // 0-5s
        duration: Math.random() * 10 + 15 // 15-25s
    }));

    console.log('Rendering BackgroundAnimation with items:', items); // Debug log

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ bottom: -100, opacity: 0 }}
                    animate={{ 
                        bottom: '100vh',
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: item.duration,
                        delay: item.delay,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                    style={{
                        position: 'absolute',
                        left: `${item.left}%`,
                        fontSize: `${item.size}px`,
                        filter: `blur(${Math.min((item.size - 20) * 0.1, 3)}px)`, // Maximum blur of 3px
                        willChange: 'transform',
                        transform: 'translateZ(0)',
                    }}
                >
                    {item.emoji}
                </motion.div>
            ))}
        </div>
    );
};

export default BackgroundAnimation; 
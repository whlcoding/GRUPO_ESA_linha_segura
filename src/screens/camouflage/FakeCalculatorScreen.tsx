import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Operator = '+' | '-' | '×' | '÷';

const BUTTON_ROWS: string[][] = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

function calculate(a: number, b: number, operator: Operator): number {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return b === 0 ? 0 : a / b;
  }
}

export function FakeCalculatorScreen({ onRevealAttempt }: { onRevealAttempt: () => void }) {
  const [display, setDisplay] = useState('0');
  const [pendingValue, setPendingValue] = useState<number | null>(null);
  const [pendingOperator, setPendingOperator] = useState<Operator | null>(null);

  const isOperator = (key: string): key is Operator => ['+', '-', '×', '÷'].includes(key);

  const handlePress = (key: string) => {
    if (key === 'C') {
      setDisplay('0');
      setPendingValue(null);
      setPendingOperator(null);
      return;
    }

    if (key === '±') {
      setDisplay((current) => String(parseFloat(current) * -1));
      return;
    }

    if (key === '%') {
      setDisplay((current) => String(parseFloat(current) / 100));
      return;
    }

    if (isOperator(key)) {
      setPendingValue(parseFloat(display));
      setPendingOperator(key);
      setDisplay('0');
      return;
    }

    if (key === '=') {
      if (pendingValue !== null && pendingOperator) {
        const result = calculate(pendingValue, parseFloat(display), pendingOperator);
        setDisplay(String(result));
        setPendingValue(null);
        setPendingOperator(null);
      }
      return;
    }

    if (key === '.') {
      setDisplay((current) => (current.includes('.') ? current : `${current}.`));
      return;
    }

    setDisplay((current) => (current === '0' ? key : current + key));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.displayWrapper}>
        <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>
          {display}
        </Text>
      </View>
      <View style={styles.pad}>
        {BUTTON_ROWS.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((key) => (
              <Pressable
                key={key}
                onPress={() => handlePress(key)}
                onLongPress={key === 'C' ? onRevealAttempt : undefined}
                delayLongPress={3000}
                style={({ pressed }) => [
                  styles.key,
                  key === '0' && styles.keyWide,
                  isOperator(key) || key === '=' ? styles.keyOperator : styles.keyDefault,
                  pressed && styles.keyPressed,
                ]}
              >
                <Text
                  style={[styles.keyLabel, (isOperator(key) || key === '=') && styles.keyLabelOperator]}
                >
                  {key}
                </Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  displayWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'flex-end',
  },
  display: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: '300',
  },
  pad: {
    paddingHorizontal: 12,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  key: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyWide: {
    flex: 2,
    aspectRatio: 2.2,
    alignItems: 'flex-start',
    paddingLeft: 28,
  },
  keyDefault: {
    backgroundColor: '#333333',
  },
  keyOperator: {
    backgroundColor: '#FF9F0A',
  },
  keyPressed: {
    opacity: 0.7,
  },
  keyLabel: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '500',
  },
  keyLabelOperator: {
    color: '#FFFFFF',
  },
});

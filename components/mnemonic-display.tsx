import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface MnemonicDisplayProps {
  mnemonic: string;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
  onContinue: () => void;
}

export function MnemonicDisplay({
  mnemonic,
  checked,
  onCheckChange,
  onContinue,
}: MnemonicDisplayProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic);
    toast.success("Secret phrase copied to clipboard");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card border rounded-xl p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Secret Recovery Phrase</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="text-muted-foreground hover:text-foreground"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Write down these 12 words in order and store them safely. This phrase is
          the only way to recover your wallet if you lose access.
        </p>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {mnemonic.split(" ").map((word, index) => (
            <div
              key={index}
              className="bg-muted p-3 rounded-lg flex items-center"
            >
              <span className="text-muted-foreground mr-2 text-sm">
                {index + 1}.
              </span>
              <span className="font-medium">{word}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2 mb-6">
          <Checkbox
            id="terms"
            checked={checked}
            onCheckedChange={(checked) => onCheckChange(checked as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have securely saved my recovery phrase
          </label>
        </div>
        <Button
          className="w-full"
          disabled={!checked}
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
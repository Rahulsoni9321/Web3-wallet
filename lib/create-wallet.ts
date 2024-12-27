import {generateMnemonic,mnemonicToSeedSync} from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { secureHeapUsed } from "crypto";
import { toast } from "sonner";




let seed = "";
let solanaWallet = 0;
let ethereumWallet = 0;
export function generateSecretPhrase():any {
    const mnemonic = generateMnemonic();
     seed = mnemonicToSeedSync(mnemonic).toString("hex");  
    return mnemonic;
}

export function createWallet(type: "solana" | "ethereum"): any {
    let path = "";
    if (type === "solana") {
        path = `m/44'/501'/${solanaWallet}'/0'`;
        
        toast.success("Solana Wallet Created");
        solanaWallet++;
    } else {
        path = `m/44'/60'/${ethereumWallet}'/0'`;
        toast.success("Ethereum Wallet Created");
        ethereumWallet++;
    }
    const derivedSeed = derivePath(path, seed).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
    const privateKey = bs58.encode(secret);

    return {
        publicKey,
        privateKey
    };
}


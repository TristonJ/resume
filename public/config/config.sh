HOST="https://www.tristonjones.com/public/config/"
BASH=$HOST"bashExtras";
CONFIG=$HOST"config.fish";
TMUX=$HOST"tmux.conf";

# Install fish shell and tmux
sudo apt-add-repository ppa:fish-shell/release-2;
sudo apt-get update && sudo apt-get install fish tmux;
chsh -s /usr/bin/fish;

[[ -d $HOME/.config/fish ]] || mkdir -p $HOME/.config/fish;

# Install my bash extras
curl -o bashExtras $BASH;
cat bashExtras >> $HOME/.bashrc;
rm bashExtras;

# Get my fish config and tmux config
curl -o $HOME/.config/fish/config.fish $CONFIG;
curl -o $HOME/.tmux.conf $TMUX;

# Use fish for every new bash window
echo 'exec fish' >> ~/.bashrc;

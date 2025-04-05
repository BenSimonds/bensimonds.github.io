NOTEBOOKS=$(cat notebooks.json | jq -r 'keys[]')
echo "NOTEBOOKS: $NOTEBOOKS"

if [ -z "$NOTEBOOKS" ]; then
    echo "No notebooks found in package.json"
    exit 1
fi

# Loop thorugh key-value pairs
for NOTEBOOK in $NOTEBOOKS; do
    # NOTEBOOK will be in the form "@bensimonds/something"
    URL=$(cat notebooks.json | jq -r ".[\"$NOTEBOOK\"]")
    echo "NOTEBOOK: $NOTEBOOK"
    echo "URL: $URL"
    curl --output notebooks/$NOTEBOOK.tar.gz $URL
    
    # Split the url into the path and filename
    NBDIR=$(dirname $URL)
    NBFILE=$(basename $URL)
    # Extract the tar.gz file to notebooks/$NBDIR/$NBFILE/
    mkdir -p notebooks/$NOTEBOOK
    tar -xzf notebooks/$NOTEBOOK.tar.gz -C notebooks/$NOTEBOOK --strip-components=1
    # Remove the tar.gz file
    rm notebooks/$NOTEBOOK.tar.gz
    echo "Downloaded and extracted $NOTEBOOK"
done
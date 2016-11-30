<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html"/>
<xsl:template match="/">
  <html>
  <body>
    <h2>XML</h2>
    
    <table border="1">
      <tr>
		<th>Groupe</th>
		<th>Thèmes</th>
      </tr>
    <xsl:for-each select="//questionsGvt/question[not(auteur/groupe/abrege=preceding::auteur/groupe/abrege)]/auteur/groupe/abrege">
      <xsl:variable name="groupe" select="."/>
      <tr>
	      <td>
				<xsl:value-of select="$groupe"/>
				<xsl:text disable-output-escaping="yes">&#160;:&#160;</xsl:text>
				<xsl:value-of select="count(//questionsGvt/question[auteur/groupe/abrege=$groupe])"/>
			 </td>
	      <td>
	      <xsl:for-each select="//questionsGvt/question[auteur/groupe/abrege=$groupe]">
	        <xsl:variable name="rubrique" select=".[not(indexationAN/rubrique=preceding-sibling::indexationAN/rubrique)]/indexationAN/rubrique"/>
	      	<xsl:value-of select="$rubrique"/>
	      	<xsl:text disable-output-escaping="yes">:</xsl:text>
	      	<xsl:value-of select="count(//questionsGvt/question[auteur/groupe/abrege=$groupe and indexationAN/rubrique=$rubrique])"/>
	      	<xsl:text disable-output-escaping="yes"> / </xsl:text>
	      </xsl:for-each>
	      </td>
	  </tr>
    </xsl:for-each>
    </table>
    

  </body>
  </html>
</xsl:template>
</xsl:stylesheet>